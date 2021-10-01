import { State } from "vue"
import { EnumResourceItem } from "../core/table"



export const getters = {
    getInfluenceItem:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.Influence)
    },
    getMoneyItem:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.Money)
    },
    getCost1Item:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.Cost1)
    },
    getCost2Item:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.Cost2)
    },
    getBelieverItem:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.Believer)
    },
    getPeopleItem:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.People)
    },
    getPolicyItem:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.Policy)
    },
    getPoliticalItem:(state:State)=>{
        return state.gameData.sourceArr.get(EnumResourceItem.Political)
    },
}
