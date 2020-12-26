import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/'

type CodeExamples = Record<string, string>

// TODO: docsssssss
export const highlightCodeExamples = (examples: CodeExamples): CodeExamples => {
  const highlightedExamples = {}

  const languages = new Map()

  for (const example in examples) {
    // Grab the extension out of the filename, it's the last section after
    // splitting by `.` characters.
    const [extension] = example.split('.').reverse()

    // If we haven't loaded this syntax into prism yet, track the extension in
    // the map of languages and load its syntax into prism
    if (!languages.has(extension)) {
      languages.set(extension, extension)
      loadLanguages([extension])
    }

    // For each example, highlight it with prism manually since the MDX plugin
    // won't recognize the Example component as `code` that needs to be run thru
    // `prism`.
    highlightedExamples[example] = Prism.highlight(
      examples[example],
      Prism.languages[extension],
      extension
    )
  }

  return highlightedExamples
}
