import cac from "cac";
import chalk from "chalk";
import prompts from "prompts";
import nodeFetch from "node-fetch";
import qs from "qs";
import cityList from "./city.json" assert { type: "json" };

function paddingZero(num) {
  return num >= 10 ? num : "0" + num;
}

const appid = "38862861";
const appsecret = "qbjY6QLt";
const cli = cac();

cli.command("city", "checkout weather").action(async (_, options) => {
  const current = new Date();
  const result = await prompts([
    {
      type: "text",
      message: "请输入查询的城市：",
      name: "city",
      initial: "深圳",
    },
    {
      type: "text",
      message: "请输入查询的日期（示例：07-19）：",
      name: "date",
      initial: `${paddingZero(current.getMonth() + 1)}-${paddingZero(
        current.getDate()
      )}`,
    },
  ]);

  const { city, date } = result;
  const params = {
    city: result.city,
    appid,
    appsecret,
    version: "v61",
    unescape: 1,
  };

  const response = await nodeFetch(
    `https://v0.yiketianqi.com/api?${qs.stringify(params)}`
  );
  const responseJson = await response.json();
  console.log(`
      当前时间：  ${chalk.blue(responseJson.date)}  
      当前城市：  ${chalk.red(responseJson.city)}
      当前温度：  ${chalk.cyan(responseJson.tem)}℃  
      最高温度：  ${chalk.cyan(responseJson.tem1)}℃    
      最低温度：  ${responseJson.tem2}℃  
      风力：     ${responseJson.win_speed} 
      风速：     ${responseJson.win_meter}   
      湿度：     ${responseJson.humidity}
      空气质量：  ${responseJson.air_level} 
      PM2.5：    ${responseJson.air_pm25}
      空气质量提示：${responseJson.air_tips}
    `);
});
cli.command("curse", "curse someone").action(async (who, options) => {
  const result = await prompts([
    {
      type: "text",
      message: "请输入您要诅骂的人：",
      name: "name",
    },
  ]);

  const { name } = result;

  const list = [
    `${name}是个大傻逼**`,
    `${name}是个狗逼**`,
    `${name}是个大笨逼**`,
    `${name}是个憨逼**`,
    `${name}是个狗币**`,
    `${name}心里没点逼数**`,
  ];

  const colors = ["red", "green", "yellow", "blue", "cyan", "white"];

  setInterval(() => {
    const listIdx = Math.floor(Math.random() * list.length);
    const colorsIdx = Math.floor(Math.random() * colors.length);
    console.log(chalk[colors[colorsIdx]](list[listIdx]));
  }, 1000);
});

cli.parse();
