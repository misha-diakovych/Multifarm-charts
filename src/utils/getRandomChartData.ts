export const generateRandomData = (minVal: number,maxVal: number) => {
    let res = []
    const currentMonth = new Date().getMonth() + 1
    for (let index = 1; index <= 30; index++) {
        let randomValue = (Math.random() * (maxVal - minVal) + minVal )
        res.push({
            date: new Date(`2022-${currentMonth}-${index}`),
            value: (+randomValue * 0.05).toFixed(2)
        })
    }
    return res
}
