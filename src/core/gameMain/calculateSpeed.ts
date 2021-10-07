import { ElMessage } from "element-plus";
import { store } from "../../store";
import { GetTotalWorks } from "../system/works";
import {
  EnumResearchProp,
  EnumResourceItem,
  EnumWorkType,
} from "../tables/Enum";
import { Resource } from "../tables/GlobalConfig";
import language from "../tables/language";
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

  //工人数量 * 效率加成 * 金钱消耗倍率 * 降低金钱转化消耗 * 基础值加成 = 最终消耗金钱
  num1 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost1Ratio)
        ? researchProps.get(EnumResearchProp.Cost1Ratio)!
        : 0)) *
    Resource.Cost1MoneyRatio *
    (1 + num11) *
    num10;
  num2 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost2Ratio)
        ? researchProps.get(EnumResearchProp.Cost2Ratio)!
        : 0)) *
    Resource.Cost2MoneyRatio *
    (1 + num11) *
    num10;
  num12 *=
    (1 +
      (researchProps.get(EnumResearchProp.PolicyRatio)
        ? researchProps.get(EnumResearchProp.PolicyRatio)!
        : 0)) *
    Resource.PolicyCostBaseRatio *
    (1 + num11) *
    num10; //

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
  if (num9 * deltaTime + moneyData.cacheValue < 0) {
    //这一帧金钱会扣到0以下，所有工人全部停工
    for (let i = 0; i < workConfig.length; i++) {
      workConfig[i] = 0;
    }
    isDebts = true;
    moneyData.cacheSpeed = num7;
    ElMessage.success({
      message: "金钱不足，所有信徒、从众均离开了工作岗位",
      duration: 5000,
      showClose: true,
      center: true,
      iconClass: "warning",
    });
    store.state.gameData.autoWorkIndex = -1;
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
) {
  const cost1 = sourceArr.get(EnumResourceItem.Cost1)!;
  const cost2 = sourceArr.get(EnumResourceItem.Cost2)!;
  const policy = sourceArr.get(EnumResourceItem.Policy)!;
  if(!cost1.unlock){//没解锁直接return
    return;
  }

  let num1 = workConfig[EnumWorkType.Cost1Work]; //动漫知识工人
  let num2 = workConfig[EnumWorkType.Cost2Work]; //游戏知识工人
  let num3 = workConfig[EnumWorkType.PolicyWork]; //政策工人
  let num4 = researchProps.get(EnumResearchProp.Cost1Ratio)
    ? researchProps.get(EnumResearchProp.Cost1Ratio)!
    : 0; //动漫转化效率提升
  let num5 = researchProps.get(EnumResearchProp.Cost2Ratio)
    ? researchProps.get(EnumResearchProp.Cost2Ratio)!
    : 0; //游戏转化效率提升
 
  let num8 = researchProps.get(EnumResearchProp.WorkBaseRatio)
    ? researchProps.get(EnumResearchProp.WorkBaseRatio)!
    : 0; //法案提供的工作基础值百分比
  //先算动漫、游戏知识的产出速度=人数*动漫效率*基础值提升
  num1 *= (1 + num4) * (1 + num8);
  num2 *= (1 + num5) * (1 + num8);

  if(!cost2.unlock){
    cost1.cacheSpeed = num1;
    cost2.cacheSpeed = 0;
    policy.cacheSpeed = 0;
    return false;
  }
  if(!policy.unlock || num3 < 1){
    cost1.cacheSpeed = num1;
    cost2.cacheSpeed = num2;
    policy.cacheSpeed = 0;
    return false;
  }
  //政策资源解锁了且安排了一个人，才考虑消耗问问题
  let num6 = researchProps.get(EnumResearchProp.PolicyRatio)
  ? researchProps.get(EnumResearchProp.PolicyRatio)!
  : 0; //政策转化效率提升
let num7 = researchProps.get(EnumResearchProp.ResearchCostRatio)
  ? researchProps.get(EnumResearchProp.ResearchCostRatio)!
  : 1; //法案提供的金钱转化消耗降低，递减属性，默认是1

  //政策消耗数值=人数*策略效率*消耗知识的倍率 * 消耗降低百分比 * 基础值提升
  num3 *= (1 + num6) * Resource.PolicyCostBaseRatio * num7 * (1 + num8);
  cost1.cacheSpeed = num1 - num3;
  cost2.cacheSpeed = num2 - num3;
  policy.cacheSpeed = num3 * Resource.PolicyAddBase / Resource.PolicyCostBaseRatio; //算自身的速度的时候要除以消耗知识的倍率
  //如果知识的速度加上当前的值，小于0，清楚政策的工人就可以了
  let isDebts = false;
  if (
    cost1.cacheSpeed * deltaTime + cost1.cacheValue < 0 || cost2.cacheSpeed * deltaTime + cost2.cacheValue < 0
  ) {
    workConfig[EnumWorkType.PolicyWork] = 0;
    isDebts = true;//此时知识的速度就不用减去消耗了
    cost1.cacheSpeed = num1;
    cost2.cacheSpeed = num2;
    policy.cacheSpeed = 0;
    ElMessage.success({
      message: "知识不足，所有信徒、从众均离开了会议室",
      duration: 5000,
      showClose: true,
      center: true,
      iconClass: "warning",
    });
  }
  return isDebts;
}
