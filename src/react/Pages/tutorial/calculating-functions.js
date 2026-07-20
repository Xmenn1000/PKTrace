export const getSingleSelectionPoints = (options, selectedValue) => {
  const selectedOption = options.find(
    (option) => String(option.value) === String(selectedValue)
  )

  return Number(selectedOption?.points ?? 0)
}

export const knownMovesPoints = (selectedValues, options) => {
  if (!Array.isArray(selectedValues)) {
    return 0
  }

  return selectedValues.reduce((total, selectedValue) => {
    // Unterstützt sowohl ["1", "2"] als auch ausgewählte Optionsobjekte
    const value =
      typeof selectedValue === 'object'
        ? selectedValue.value
        : selectedValue

    const selectedMove = options.find(
      (option) => String(option.value) === String(value)
    )

    return total + Number(selectedMove?.points ?? 0)
  }, 0)
}

export const getSliderPoints = (question, selectedValue) => {
  if (
    selectedValue === '' ||
    selectedValue === null ||
    selectedValue === undefined
  ) {
    return 0
  }

  const numericValue = Number(selectedValue)

  if (Number.isNaN(numericValue)) {
    return 0
  }

  if (typeof question.valuePoints === 'function') {
    return Number(question.valuePoints(numericValue) ?? 0)
  }

  return Number(question.valuePoints?.[numericValue] ?? 0)
}
