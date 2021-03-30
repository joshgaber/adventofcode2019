import Day from './day'
import Day1 from './day1'
import Day2 from './day2'
import Day3 from './day3'
import Day4 from './day4'
import Day5 from './day5'
import Day6 from './day6'
import Day7 from './day7'
import Day8 from './day8'
import Day9 from './day9'
import Day10 from './day10'
import Day11 from './day11'
import Day12 from './day12'
import Day13 from './day13'
import Day14 from './day14'
import Day15 from './day15'
import Day16 from './day16'
import Day17 from './day17'
import Day18 from './day18'

const days: {
  [key: string]: {
    new (data: string): Day
  }
} = {
  day1: Day1,
  day2: Day2,
  day3: Day3,
  day4: Day4,
  day5: Day5,
  day6: Day6,
  day7: Day7,
  day8: Day8,
  day9: Day9,
  day10: Day10,
  day11: Day11,
  day12: Day12,
  day13: Day13,
  day14: Day14,
  day15: Day15,
  day16: Day16,
  day17: Day17,
  day18: Day18
}

export default days
