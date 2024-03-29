export const required = (value: any) => {
    if (value) return undefined;
    return "Field is required!"
}

export const maxLengthCreator = (maxLength:number) => (value: any) => {
    if (value && value.length > maxLength) return `Max lenth is ${maxLength} symbols!`;
    return undefined;
}