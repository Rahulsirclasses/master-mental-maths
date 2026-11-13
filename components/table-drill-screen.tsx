"use client"

import { useState } from "react"
import { ArrowLeft, Check, RefreshCw, X, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MotivationalQuote } from "@/components/motivational-quote"
import Link from "next/link"
import React from "react"

// Generate a random 5x5 table with numbers between 1-99
const generateTable = () => {
  const table = []
  for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 5; j++) {
      row.push(Math.floor(Math.random() * 99) + 1)
    }
    table.push(row)
  }
  return table
}

// Calculate row sums
const calculateRowSums = (table: number[][]) => {
  return table.map((row) => row.reduce((sum, num) => sum + num, 0))
}

// Calculate column sums
const calculateColumnSums = (table: number[][]) => {
  const columnSums = Array(5).fill(0)
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      columnSums[j] += table[i][j]
    }
  }
  return columnSums
}

// Calculate cell percentage of row
const calculateRowPercentages = (table: number[][], rowSums: number[]) => {
  return table.map((row, i) => row.map((cell) => ((cell / rowSums[i]) * 100).toFixed(1)))
}

// Calculate cell percentage of column
const calculateColumnPercentages = (table: number[][], columnSums: number[]) => {
  const percentages = []
  for (let i = 0; i < 5; i++) {
    const rowPercentages = []
    for (let j = 0; j < 5; j++) {
      rowPercentages.push(((table[i][j] / columnSums[j]) * 100).toFixed(1))
    }
    percentages.push(rowPercentages)
  }
  return percentages
}

type DrillType = "row-sum" | "column-sum" | "row-percentage" | "column-percentage"

// Create initial data outside component to avoid regeneration
const createInitialData = () => {
  const initialTable = generateTable()
  const initialRowSums = calculateRowSums(initialTable)
  const initialColumnSums = calculateColumnSums(initialTable)
  const initialRowPercentages = calculateRowPercentages(initialTable, initialRowSums)
  const initialColumnPercentages = calculateColumnPercentages(initialTable, initialColumnSums)

  return {
    table: initialTable,
    rowSums: initialRowSums,
    columnSums: initialColumnSums,
    rowPercentages: initialRowPercentages,
    columnPercentages: initialColumnPercentages,
  }
}

export function TableDrillScreen() {
  const [tableData, setTableData] = useState(() => createInitialData())
  const [drillType, setDrillType] = useState<DrillType>("row-sum")
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(5).fill(""))
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean[]>(Array(5).fill(false))

  const resetTable = () => {
    const newData = createInitialData()
    setTableData(newData)
    setUserAnswers(Array(5).fill(""))
    setIsChecked(false)
    setIsCorrect(Array(5).fill(false))
  }

  const handleDrillTypeChange = (value: string) => {
    setDrillType(value as DrillType)
    setUserAnswers(Array(5).fill(""))
    setIsChecked(false)
    setIsCorrect(Array(5).fill(false))
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[index] = value
    setUserAnswers(newAnswers)
  }

  const handleTableCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newTable = [...tableData.table]
    newTable[rowIndex][colIndex] = Number.parseInt(value) || 0

    // Recalculate all dependent values
    const newRowSums = calculateRowSums(newTable)
    const newColumnSums = calculateColumnSums(newTable)
    const newRowPercentages = calculateRowPercentages(newTable, newRowSums)
    const newColumnPercentages = calculateColumnPercentages(newTable, newColumnSums)

    setTableData({
      table: newTable,
      rowSums: newRowSums,
      columnSums: newColumnSums,
      rowPercentages: newRowPercentages,
      columnPercentages: newColumnPercentages,
    })
  }

  const checkAnswers = () => {
    let correctAnswers: (number | string)[] = []

    switch (drillType) {
      case "row-sum":
        correctAnswers = tableData.rowSums
        break
      case "column-sum":
        correctAnswers = tableData.columnSums
        break
      case "row-percentage":
        correctAnswers = tableData.rowPercentages.map((row) => row[0])
        break
      case "column-percentage":
        correctAnswers = tableData.columnPercentages.map((row) => row[0])
        break
    }

    const newIsCorrect = userAnswers.map((answer, index) => {
      if (drillType === "row-percentage" || drillType === "column-percentage") {
        const userValue = Number.parseFloat(answer)
        const correctValue = Number.parseFloat(correctAnswers[index] as string)
        return Math.abs(userValue - correctValue) <= 0.5
      } else {
        return Number.parseInt(answer) === correctAnswers[index]
      }
    })

    setIsCorrect(newIsCorrect)
    setIsChecked(true)
  }

  const getPromptText = () => {
    switch (drillType) {
      case "row-sum":
        return "Calculate the sum of each row"
      case "column-sum":
        return "Calculate the sum of each column"
      case "row-percentage":
        return "What percentage is the first cell of each row's total?"
      case "column-percentage":
        return "What percentage is the first cell of each column's total?"
    }
  }

  const getAnswerLabel = (index: number) => {
    switch (drillType) {
      case "row-sum":
        return `Row ${index + 1} Sum`
      case "column-sum":
        return `Col ${index + 1} Sum`
      case "row-percentage":
        return `Row ${index + 1} %`
      case "column-percentage":
        return `Col ${index + 1} %`
    }
  }

  // Render the table grid
  const renderTableGrid = (highlightFirstColumn = false, highlightFirstRow = false) => (
    <div className="grid grid-cols-6 gap-2 max-w-4xl mx-auto">
      {/* Header row */}
      <div className="text-center font-bold text-gray-300 text-sm p-2">Row</div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`header-${i}`} className="text-center font-bold text-gray-300 text-sm p-2">
          Col {i + 1}
        </div>
      ))}

      {/* Table rows */}
      {tableData.table.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          <div className="text-center font-bold text-gray-300 text-sm p-2 flex items-center justify-center">
            {rowIndex + 1}
          </div>
          {row.map((cell, colIndex) => (
            <Input
              key={`cell-${rowIndex}-${colIndex}`}
              type="number"
              value={cell}
              onChange={(e) => handleTableCellChange(rowIndex, colIndex, e.target.value)}
              className={`text-center border-gray-300 h-12 text-sm font-medium ${
                highlightFirstColumn && colIndex === 0
                  ? "bg-pink-100 text-black border-pink-300"
                  : highlightFirstRow && rowIndex === 0
                    ? "bg-orange-100 text-black border-orange-300"
                    : "bg-white text-black"
              }`}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-black">
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/practice">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-800">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Practice</span>
                </Button>
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full">
                <Target className="h-3 w-3 text-sky-400" />
                <span className="text-xs font-medium text-sky-400">Table Drill</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">5×5 Table Drill</h1>
            <p className="text-gray-400 mb-4 text-sm">Practice calculating sums and percentages with the 5×5 table</p>
          </div>
          <div className="w-full md:w-auto">
            <MotivationalQuote />
          </div>
        </div>

        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-lg">{getPromptText()}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="row-sum" onValueChange={handleDrillTypeChange}>
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-900/50 border border-gray-700/50">
                <TabsTrigger
                  value="row-sum"
                  className="text-gray-300 data-[state=active]:bg-sky-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                >
                  Row Sum
                </TabsTrigger>
                <TabsTrigger
                  value="column-sum"
                  className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                >
                  Column Sum
                </TabsTrigger>
                <TabsTrigger
                  value="row-percentage"
                  className="text-gray-300 data-[state=active]:bg-pink-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                >
                  Row %
                </TabsTrigger>
                <TabsTrigger
                  value="column-percentage"
                  className="text-gray-300 data-[state=active]:bg-orange-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                >
                  Column %
                </TabsTrigger>
              </TabsList>

              <TabsContent value="row-sum" className="mt-0">
                <div className="mb-8">{renderTableGrid()}</div>

                {/* Answer inputs */}
                <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`answer-${i}`} className="space-y-2">
                      <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                        {getAnswerLabel(i)}
                      </Label>
                      <div className="flex flex-col items-center">
                        <Input
                          id={`answer-${i}`}
                          type="number"
                          value={userAnswers[i]}
                          onChange={(e) => handleAnswerChange(i, e.target.value)}
                          className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                            isChecked ? (isCorrect[i] ? "border-green-500" : "border-red-500") : ""
                          }`}
                        />
                        {isChecked && (
                          <div className="mt-2 flex items-center justify-center">
                            {isCorrect[i] ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="column-sum" className="mt-0">
                <div className="mb-8">{renderTableGrid()}</div>

                <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`answer-${i}`} className="space-y-2">
                      <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                        {getAnswerLabel(i)}
                      </Label>
                      <div className="flex flex-col items-center">
                        <Input
                          id={`answer-${i}`}
                          type="number"
                          value={userAnswers[i]}
                          onChange={(e) => handleAnswerChange(i, e.target.value)}
                          className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                            isChecked ? (isCorrect[i] ? "border-green-500" : "border-red-500") : ""
                          }`}
                        />
                        {isChecked && (
                          <div className="mt-2 flex items-center justify-center">
                            {isCorrect[i] ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="row-percentage" className="mt-0">
                <div className="mb-8">{renderTableGrid(true, false)}</div>

                <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`answer-${i}`} className="space-y-2">
                      <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                        {getAnswerLabel(i)}
                      </Label>
                      <div className="flex flex-col items-center">
                        <Input
                          id={`answer-${i}`}
                          type="number"
                          step="0.1"
                          value={userAnswers[i]}
                          onChange={(e) => handleAnswerChange(i, e.target.value)}
                          className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                            isChecked ? (isCorrect[i] ? "border-green-500" : "border-red-500") : ""
                          }`}
                        />
                        {isChecked && (
                          <div className="mt-2 flex items-center justify-center">
                            {isCorrect[i] ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="column-percentage" className="mt-0">
                <div className="mb-8">{renderTableGrid(false, true)}</div>

                <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`answer-${i}`} className="space-y-2">
                      <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                        {getAnswerLabel(i)}
                      </Label>
                      <div className="flex flex-col items-center">
                        <Input
                          id={`answer-${i}`}
                          type="number"
                          step="0.1"
                          value={userAnswers[i]}
                          onChange={(e) => handleAnswerChange(i, e.target.value)}
                          className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                            isChecked ? (isCorrect[i] ? "border-green-500" : "border-red-500") : ""
                          }`}
                        />
                        {isChecked && (
                          <div className="mt-2 flex items-center justify-center">
                            {isCorrect[i] ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-700/50">
            <Button
              variant="outline"
              onClick={resetTable}
              className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
            >
              <RefreshCw className="h-3 w-3" />
              <span>New Table</span>
            </Button>
            <Button onClick={checkAnswers} className="bg-sky-600 hover:bg-sky-700 text-xs">
              Check Answers
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
