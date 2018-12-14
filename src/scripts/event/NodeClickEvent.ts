export type NodeClickEvent = {
    id: string,
    // 左ボタン=0, 中央ボタン=1, 右ボタン=2。
    buttons: number
}

export const LEFT_BUTTON: number = 0;
export const CENTER_BUTTON: number = 1;
export const RIGHT_BUTTON: number = 2;
