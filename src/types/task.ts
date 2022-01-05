interface ITask {
    title: string,
    description: string,
    ended_at: string,
    files: FileList | [],
    //priority: string,
    //tags: string
}
interface ISubtask extends ITask {}

interface ITaskValue {
    value: string | File | FileList
}

interface ISubtaskEmit extends ITaskValue {
    index: number,
}

interface ISubtaskStructure extends ISubtaskEmit, ITaskValue {
    updatingField: string
}

export { ISubtask, ITask, ISubtaskEmit, ISubtaskStructure, ITaskValue }