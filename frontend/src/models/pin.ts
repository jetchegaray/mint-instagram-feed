export default class Pin {
  id: string;
  title: string;
  description: string;
  url?: string;
  blobImage: string;
  sizeImage: string;
  fileImage: File;

  constructor(
    id: string,
    title: string,
    description: string,
    url: string,
    blobImage: string,
    sizeImage: string,
    fileImage: File
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.url = url;
    this.blobImage = blobImage;
    this.sizeImage = sizeImage;
    this.fileImage = fileImage;
  }
}
