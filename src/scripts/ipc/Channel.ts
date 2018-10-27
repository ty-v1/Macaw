/**
 * ここにはipcのチャンネル名を定義する
 *
 * ipcのチャンネル名は必ずここに定義されている定数を使う
 *
 * チャンネル名はスネーク記法を使う
 * @example
 * namespace OnClickFileMenu {
 *      export const CHANNEL = "..."
 * }
 *
 * */
export class Channel {
    public static readonly FILE_READ = "file-read";
}

module FileRead {
    export const CHANNEL = "file-read";
}

module FileDropped {
    export const CHANNEL = "file-dropped";
}
