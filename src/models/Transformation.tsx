export interface Transformation {
    id: string
    icon: any
    key: string
    name: string
    type: string
    identifier: string
    description?: string
    params: { [key: string]: any }
}