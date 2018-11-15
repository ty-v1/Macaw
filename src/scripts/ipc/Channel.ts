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
    public static readonly FILE_READ = 'file-read';

    public static readonly FILE_DROPPED = 'file-dropped';
}
