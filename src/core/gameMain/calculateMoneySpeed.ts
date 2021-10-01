import { GetTotalWorks } from "../system/works";
import { EnumResearchProp, EnumResourceItem, EnumWorkType } from "../tables/Enum";
import GlobalConfig from "../tables/GlobalConfig";
import { buildItemData, resourceItemData } from "./gameSave";

/** * 计算当前金钱的最终速度，考虑产出和消耗 */
export function calculateMoneySpeed(
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>,
  workConfig: number[],
  researchProps: Map<EnumResearchProp, number>,
  deltaTime: number) {
  const moneyData = sourceArr.get(EnumResourceItem.Money)!;
  let num1 = workConfig[EnumWorkType.Cost1Work]; //动漫知识工人
  let num2 = workConfig[EnumWorkType.Cost2Work]; //游戏知识工人
  let num3 = sourceArr.get(EnumResourceItem.Believer)!.cacheValue; //信徒数量
  let num4 = GetTotalWorks(); //正在工作的工人数量
  let num5 = Math.max(0, num4 - num3); //从众正在工作的数量,至少0，说明信徒没安排买
  let num6 = num5 * 1; //TODO 每个从众额外消耗多少金钱用分段函数

  //工人数量 * 效率加成 * 金钱消耗倍率 = 最终消耗金钱
  num1 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost1Ratio)
        ? researchProps.get(EnumResearchProp.Cost1Ratio)!
        : 0)) *
    GlobalConfig.Resource.Cost1MoneyRatio;
  num2 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost2Ratio)
        ? researchProps.get(EnumResearchProp.Cost2Ratio)!
        : 0)) *
    GlobalConfig.Resource.Cost2MoneyRatio;
  //工人支出、cost1转化、cost2转化
  //影响力收入
  let num7: number = sourceArr.get(EnumResourceItem.Influence)!.cacheValue; //影响力总数
  let num8 = workConfig[EnumWorkType.MoneyWork] * GlobalConfig.Resource.GetMoneyRatio; //金钱工人数量
  if (researchProps.has(EnumResearchProp.InfluenceMoney)) {
    num7 *= researchProps.get(EnumResearchProp.InfluenceMoney)!; //影响力转化金钱
  } else
    num7 = 0;
  if (researchProps.has(EnumResearchProp.MoneyRatio)) {
    num8 *= 1 + researchProps.get(EnumResearchProp.MoneyRatio)!; //金钱工人总收入
  }
  let num9 = num8 + num7 - num6 - num1 - num2; //金钱工人收入+影响力收入 - 从众工人支持-研究1消耗-研究2消耗
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
