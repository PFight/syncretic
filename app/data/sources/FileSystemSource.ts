import { ObjectsSource, ObjectSourceType } from "./ObjectsSource";

export class FileSystemSource extends ObjectsSource {
    public get sourceType() { return ObjectSourceType.FileSystem };
    public rootUri: string;
}