export type OpenAIChatResponse = {
  choices: {
    message: {
      role: string
      content: string
    }
  }[]
}
