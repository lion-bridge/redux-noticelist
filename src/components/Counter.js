export const Counter = (props = {}) => {
    const {value = ''} = props
    return <h1>数值{value}</h1>
}