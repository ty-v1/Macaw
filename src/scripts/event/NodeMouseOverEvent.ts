import {Message} from "@/store/VariantPopupStore";

export type NodeMouseOverEvent = {
    id: string,
    nodeX: number,
    nodeY: number,
    nodeWidth: number,
    nodeHeight: number,
    pageX: number,
    pageY: number,
    message: Message
}
