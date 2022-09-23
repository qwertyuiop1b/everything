const fs = require("fs");
const { Base64Decode } = require("base64-stream");
const Imap = require("imap");
const config = require("./config.json");
const rfc2047 = require("rfc2047")
const imap = new Imap(config.imap);

function findAttachmentParts(struct, attachments) {
  attachments = attachments || [];
  for (var i = 0, len = struct.length, r; i < len; ++i) {
    if (Array.isArray(struct[i])) {
      findAttachmentParts(struct[i], attachments);
    } else {
      if (
        struct[i].disposition &&
        ["inline", "attachment"].indexOf(
          struct[i].disposition.type.toLowerCase()
        ) > -1
      ) {
        attachments.push(struct[i]);
      }
    }
  }
  return attachments;
}

function buildAttMessageFunction(attachment, dirname) {
  dirname = dirname.trim().replace(/\\|\/|\*|:|\?|"|<|>|\||：/g, "")
  const toDecodeFilename = attachment.disposition.params?.filename || attachment.params.name
  const filename = rfc2047.decode(toDecodeFilename)
  if (!filename.trim()) return function() {}
  var encoding = attachment.encoding;

  return function (msg, seqno) {
    var prefix = "(#" + seqno + ") ";
    msg.on("body", function (stream, info) {
      //Create a write stream so that we can stream the attachment to file;
      console.log(prefix + "Streaming this attachment to file", filename, info);

      if (!fs.existsSync(`${config.downloads.directory}/${dirname}`)) {
        fs.mkdirSync(`${config.downloads.directory}/${dirname}`)
      }

      var writeStream = fs.createWriteStream(
        config.downloads && config.downloads.directory
          ? `${config.downloads.directory}/${dirname}/${filename}`
          : filename
      );
      writeStream.on("finish", function () {
        console.log(prefix + "Done writing to file %s", filename);
      });

      //so we decode during streaming using
      if (encoding.toLowerCase() === "base64") {
        //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
        stream.pipe(new Base64Decode()).pipe(writeStream);
      } else {
        //here we have none or some other decoding streamed directly to the file which renders it useless probably
        stream.pipe(writeStream);
      }
    });
    msg.once("end", function () {
      console.log(prefix + "Finished attachment %s", filename);
    });

    msg.on("error", err => {
      console.log("err===========>#", seqno)
    })
  };
}

imap.once("ready", function () {
  imap.openBox("INBOX", true, function (err, box) {
    if (err) throw err;
    var f = imap.seq.fetch("1058:*", {
      bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
      struct: true,
    });
    f.on("message", function (msg, seqno) {
      console.log("Message #%d", seqno);
      const prefix = "(#" + seqno + ") ";
      let dirName = null
      msg.on("body", function (stream, info) {
        var buffer = "";
        stream.on("data", function (chunk) {
          buffer += chunk.toString("utf8");
        });
        stream.once("end", function () {
          console.log(Imap.parseHeader(buffer).from);
          console.log(Imap.parseHeader(buffer).subject);
          dirName = Imap.parseHeader(buffer).subject[0]
        });
      });
      msg.once("attributes", function (attrs) {
        const attachments = findAttachmentParts(attrs.struct);
        console.log("dirname------->", dirName)
        console.log(prefix + "Has attachments: %d", attachments.length);

        for (var i = 0, len = attachments.length; i < len; ++i) {
          const attachment = attachments[i];
          // console.log(prefix + 'Fetching attachment %s', attachment.disposition.params.filename);
          var f = imap.fetch(attrs.uid, {
            bodies: [attachment.partID],
            struct: true,
          });
          //build function to process attachment message
          f.on("message", buildAttMessageFunction(attachment, dirName));
        }
      });
      msg.once("end", function () {
        console.log(prefix + "Finished email");
      });
    });
    f.once("error", function (err) {
      console.log("Fetch error: " + err);
    });
    f.once("end", function () {
      console.log("Done fetching all messages!");
      imap.end();
    });
  });
});

imap.once("error", function (err) {
  console.log(err);
});

imap.once("end", function () {
  console.log("Connection ended");
});

imap.connect();
