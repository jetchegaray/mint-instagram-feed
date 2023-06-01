export default class Pin {
  id: string;
  title: string;
  description: string;
  price: number;
  url?: string;
  blobImage: string;
  sizeImage: string;
  fileImage: File;

  constructor(
    id: string,
    title: string,
    description: string,
    price: number,
    url: string,
    blobImage: string,
    sizeImage: string,
    fileImage: File
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.url = url;
    this.blobImage = blobImage;
    this.sizeImage = sizeImage;
    this.fileImage = fileImage;
  }
}
