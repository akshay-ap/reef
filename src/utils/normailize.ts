import {MyStakeInterfaceMap, StakeInterFaceMap, StakeInterface} from "../slices/asset-list";

export const normalizeArray = (scores : number[]) : number[] => {
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const res: number[] = scores.map((element : number) => {
        if ((maxScore - minScore) === 0) 
            return 1;
        


        return(element - minScore) / (maxScore - minScore)
    });
    return res
}


export const getAverageScore = (count : number[], stakes : number[]) : number[] => {
    if (count.length !== stakes.length) 
        throw new Error('Unequal array lengths');
    


    const a: number[] = normalizeArray(count);
    const b: number[] = normalizeArray(stakes);

    const res: number[] = a.map((element : number, index : number) => {
        return(element + b[index]) / 2
    });
    console.log("Normailized scores:", count, stakes, res)

    return res
}

export const normalizeAndAverage = (count : number[], stakes : number[]) : number[] => {
    return getAverageScore(normalizeArray(count), normalizeArray(stakes))
}

export const getRankedDataSet = (data : StakeInterFaceMap) : {
[key: string]: number
} => {

    const myKeys: string[] = Object.keys(data);
    let counts: number[] = [];
    let amounts: number[] = [];

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            counts.push(parseInt(data[key].count));
            amounts.push(parseInt(data[key].amount));
        }
    }

    const res: number[] = getAverageScore(counts, amounts)
    const res2: {
    [key: string]: number
    } = {}

    res.forEach((r : number, index : number) => res2[myKeys[index]] = r);
    console.log('ranks', myKeys, res)
    // const keysSorted: string[] = Object.keys(res2).sort((a, b) => {
    //     return res2[a] - res2[b]
    // });
    return res2
}

export default normalizeArray
