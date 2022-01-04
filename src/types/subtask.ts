interface ITask {
    title: string,
    description: string,
    ended_at: string,
    //priority: string,
}
interface ISubtask extends ITask {}
interface ISubtaskEmit {
    index: number,
    value: string | File | FileList
}

export { ISubtask, ITask, ISubtaskEmit }