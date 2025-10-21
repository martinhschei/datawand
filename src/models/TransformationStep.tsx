export interface TransformationStep {
    icon: any
    id: string
    key: string
    name: string
    type: string,
    description?: string,
    pipeline_ref?: string,
    params: { [key: string]: any },
  }
