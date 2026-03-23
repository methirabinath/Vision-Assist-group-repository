declare module 'expo-av' {
    export const Audio: any;
    export class Recording {
        prepareToRecordAsync(options?: any): Promise<void>;
        startAsync(): Promise<void>;
        stopAndUnloadAsync(): Promise<void>;
        getURI(): string | null;
    }
}