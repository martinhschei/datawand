import { create } from 'zustand'

const useAppState = create((set) => ({
    id: "",
    contentType: "",
    originalContent: "",
    transformedContent: "",
    setId: (id: string) => set({ id }),
    setContentType: (type: string) => set({ contentType: type }),
    setOriginalContent: (content: string) => set({ originalContent: content }),
    setTransformedContent: (content: string) => set({ transformedContent: content })
}))

export default useAppState;