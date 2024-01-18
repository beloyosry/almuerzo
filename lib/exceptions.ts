export class FetchingError extends Error {
  constructor(message: string = "Failed to Fetching Data") {
    super(message)
    this.name = "FetchingError"
  }
}
