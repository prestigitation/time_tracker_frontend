interface ITask {
    title: string,
    description: string,
    ended_at: string,
    files: FileList | [],
    hours: string,
    priority: string,
}
interface ISubtask extends ITask {}

interface ITaskValue {
    value: string | File | FileList | Date
}

interface ISubtaskEmit extends ITaskValue {
    index: number,
}

interface ISubtaskStructure extends ISubtaskEmit, ITaskValue {
    updatingField: string
}

export { ISubtask, ITask, ISubtaskEmit, ISubtaskStructure, ITaskValue }