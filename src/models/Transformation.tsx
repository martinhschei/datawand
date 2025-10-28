export interface Transformation {
    id: string
    icon: any
    name: string
    type: string
    description: string
    friendly_name: string
    params: { [key: string]: any }
}