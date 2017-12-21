const editPipeline = (changes)=>{
  const changeFunc = (tag)=>{
      let newTag = tag
      changes.forEach((change)=>{
          if (tag.match(change.from)){
              newTag = newTag.replace(change.from, change.to)
          }
      })
      return newTag
  }
  return changeFunc
}

module.exports = editPipeline