import React from 'react'
import NumberFormat from 'react-number-format'

type Props = {
  value: number
}

const FormatCurrency: React.FC<Props> = ({ value }) => {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator='.>'
      prefix={'Rp '}
      renderText={(val) => <>{val.split('>').join('')}</>}
    />
  )
}

export default FormatCurrency
