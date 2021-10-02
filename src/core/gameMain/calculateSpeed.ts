import { GetTotalWorks } from "../system/works";
import {
  EnumResearchProp,
  EnumResourceItem,
  EnumWorkType,
} from "../tables/Enum";
import { Resource } from "../tables/GlobalConfig";
import { buildItemData, resourceItemData } from "./gameSave";

/** * 计算当前金钱的最终速度，考虑产出和消耗 */
export function calculateMoneySpeed(
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>,
  workConfig: number[],
  researchProps: Map<EnumResearchProp, number>,
  deltaTime: number
) {
  const moneyData = sourceArr.get(EnumResourceItem.Money)!;
  let num1 = workConfig[EnumWorkType.Cost1Work]; //动漫知识工人
  let num2 = workConfig[EnumWorkType.Cost2Work]; //游戏知识工人
  let num3 = sourceArr.get(EnumResourceItem.Believer)!.cacheValue; //信徒数量
  let num4 = GetTotalWorks(); //正在工作的工人数量
  let num5 = Math.max(0, num4 - num3); //从众正在工作的数量,至少0，说明信徒没安排满
  let num6 = num5 * 1; //TODO 每个从众额外消耗多少金钱用分段函数
  let num10 = researchProps.get(EnumResearchProp.MoneyCostRatio)
    ? researchProps.get(EnumResearchProp.MoneyCostRatio)!
    : 1; //法案提供的金钱转化消耗降低，递减属性，默认是1
  let num11 = researchProps.get(EnumResearchProp.WorkBaseRatio)
    ? researchProps.get(EnumResearchProp.WorkBaseRatio)!
    : 0; //法案提供的工作基础值百分比

  let num12 = workConfig[EnumWorkType.PolicyWork]; //政策工人的数量

  //工人数量 * 效率加成 * 金钱消耗倍率 = 最终消耗金钱
  num1 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost1Ratio)
        ? researchProps.get(EnumResearchProp.Cost1Ratio)!
        : 0)) *
    Resource.Cost1MoneyRatio *
    num10;
  num2 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost2Ratio)
        ? researchProps.get(EnumResearchProp.Cost2Ratio)!
        : 0)) *
    Resource.Cost2MoneyRatio *
    num10;
  num12 *=
    (1 +
      (researchProps.get(EnumResearchProp.PolicyRatio)
        ? researchProps.get(EnumResearchProp.PolicyRatio)!
        : 0)) *
    Resource.PolicyCostBaseRatio *
    num10;//政策转化消耗的金钱、工人数量乘以政策转化率乘以消耗乘以减消耗

  //工人支出、cost1转化、cost2转化
  //影响力收入
  let num7: number = sourceArr.get(EnumResourceItem.Influence)!.cacheValue; //影响力总数
  let num8 =
    workConfig[EnumWorkType.MoneyWork] * Resource.GetMoneyRatio * (1 + num11); //金钱工人基础产钱
  if (researchProps.has(EnumResearchProp.InfluenceMoney)) {
    num7 *= researchProps.get(EnumResearchProp.InfluenceMoney)!; //影响力转化金钱
  } else num7 = 0;
  if (researchProps.has(EnumResearchProp.MoneyRatio)) {
    num8 *= 1 + researchProps.get(EnumResearchProp.MoneyRatio)!; //金钱工人算上建筑效率产钱
  }
  let num9 = num8 + num7 - num6 - num1 - num2 - num12; //金钱工人收入+影响力收入 - 从众工人支持-研究1消耗-研究2消耗-政策点消耗
  moneyData.cacheSpeed = num9;
  let isDebts = false;
  if (num9 * deltaTime + moneyData.cacheValue <= 0) {
    //这一帧金钱会扣到0以下，所有工人全部停工
    for (let i = 0; i < workConfig.length; i++) {
      workConfig[i] = 0;
    }
    isDebts = true;
  }
  return isDebts;
}

/** * 计算当前两种知识的最终速度，考虑产出和消耗 */
export function calculatePolicySpeed(
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>,
  workConfig: number[],
  researchProps: Map<EnumResearchProp, number>,
  deltaTime: number
){
  const cost1 = sourceArr.get(EnumResourceItem.Cost1);
  const cost2 = sourceArr.get(EnumResourceItem.Cost2);
  let num1 = workConfig[EnumWorkType.Cost1Work]; //动漫知识工人
  let num2 = workConfig[EnumWorkType.Cost2Work]; //游戏知识工人
  let num3 = workConfig[EnumWorkType.PolicyWork]; //政策工人
  //先算动漫、游戏知识的产出速度，再算政策工人的消耗速度
  


}