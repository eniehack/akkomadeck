interface History {
    day: string,
    users: string,
    accounts: string,
}
export default interface Tag {
    name: string,
    url: string,
    history: History[],
    following?: boolean,
}