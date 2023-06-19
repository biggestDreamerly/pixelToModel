import React, { useState, useEffect } from 'react'
import styles from './SquareGrid.module.css'
import useEditor from '~/store/actions'

interface Coordinate {
  x: number
  y: number
}

interface PixelDataItem {
  x: number
  y: number
  color: string
}

interface SquareGridProps {
  numRows: number
  numCols: number
  cellSize: number
}

function SquareGrid(props: SquareGridProps) {
  const [highlighted, setHighlighted] = useState<number[]>([])
  const [selectedPixels, setSelectedPixels] = useState<Coordinate[]>([])
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false)
  const { pixelData, setPixelData } = useEditor()

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleMouseUp = () => {
    setIsMousePressed(false)
  }

  const onMouseEnter = (row: number, col: number) => {
    setHighlighted([row, col])
    if (isMousePressed) {
      setSelectedPixels((prevSelectedPixels) => [
        ...prevSelectedPixels,
        { x: row, y: col },
      ])
    }
  }

  const onMouseLeave = () => {
    setHighlighted([])
  }

  const onMouseDown = (
    row: number,
    col: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.button === 2) {
      const updatedPixelData = pixelData
      for (const { x, y } of selectedPixels) {
        const index = x * props.numCols + y
        updatedPixelData[index] = { x, y, color: 'white' }
      }
      setPixelData(updatedPixelData)
      setSelectedPixels([])
    } else {
      setIsMousePressed(true)
      const updatedPixelData = pixelData
      updatedPixelData[row * props.numCols + col] = {
        x: col,
        y: row,
        color: 'red',
      }
      setPixelData(updatedPixelData)
      setSelectedPixels([{ x: row, y: col }])
    }
  }
  useEffect(() => {
    console.log(Object.values(pixelData), 'pixelData')
  }, [[pixelData]])
  const renderCell = (row: number, col: number) => {
    const cellKey = `cell-${row}-${col}`
    const isHighlighted = highlighted[0] === row && highlighted[1] === col
    const color = pixelData[row * props.numCols + col]?.color
    const cellStyle = {
      top: `${row * props.cellSize}px`,
      left: `${col * props.cellSize}px`,
      width: `${props.cellSize}px`,
      height: `${props.cellSize}px`,
      backgroundColor: color,
    }

    return (
      <>
        <div
          key={cellKey}
          className={`${styles['square-cell']} ${
            isHighlighted && styles.highlighted
          } ${isHighlighted && styles.highlighted}`}
          style={cellStyle}
          onMouseDown={(e) => onMouseDown(row, col, e)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseLeave={onMouseLeave}
        />
      </>
    )
  }

  const cells = []

  for (let row = 0; row < props.numRows; row++) {
    for (let col = 0; col < props.numCols; col++) {
      cells.push(renderCell(row, col))
    }
  }

  return (
    <>
      <div className={styles.squareGrid}>{cells}</div>
    </>
  )
}

export default SquareGrid
