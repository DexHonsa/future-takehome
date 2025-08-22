/**
 * Highlights matching search terms in text
 * Wraps matched portions in bold yellow background
 */

type HighlightedTextProps = {
  text: string
  searchTerm: string
}

export function HighlightedText({ text, searchTerm }: HighlightedTextProps) {
  if (!searchTerm || !text) {
    return <>{text}</>
  }

  const segments: { text: string; isMatch: boolean }[] = []
  const lowerText = text.toLowerCase()
  const lowerSearchTerm = searchTerm.toLowerCase()
  let lastIndex = 0

  let index = lowerText.indexOf(lowerSearchTerm)
  
  while (index !== -1) {
    if (index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, index), isMatch: false })
    }
    
    segments.push({ 
      text: text.slice(index, index + searchTerm.length), 
      isMatch: true 
    })
    
    lastIndex = index + searchTerm.length
    index = lowerText.indexOf(lowerSearchTerm, lastIndex)
  }
  
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isMatch: false })
  }

  return (
    <>
      {segments.map((segment, segmentIndex) => {
        const key = `${segment.text.slice(0, 10)}-${segmentIndex}-${segment.isMatch}`
        if (segment.isMatch) {
          return (
            <span 
              key={key} 
              className="text-secondary-500 font-semibold m-0 relative whitespace-pre-wrap"
            >
              <span className="relative z-10">{segment.text}</span>
              <div className="absolute bg-secondary-100/50 border border-secondary-200/50 z-0 top-0 -left-1 -right-1 bottom-0 rounded-sm "></div>
            </span>
          )
        }
        return <span key={key} className="whitespace-pre-wrap">{segment.text}</span>
      })}
    </>
  )
}