"use client"

import { TodoComponentView } from "@/component/todo/TodoComponentView";
import { useEffect, useState } from "react";

interface MockDataType {
  type: string
  name: string
}

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [mockDataFilter, setMockDataFilter] = useState<Array<MockDataType>>([])

  const [fruit, setFruit] = useState<Array<MockDataType>>([])
  const [vegetable, setVegetable] = useState<Array<MockDataType>>([])

  const mockdata = [
    {
      type: 'Fruit',
      name: 'Apple',
    },
    {
      type: 'Vegetable',
      name: 'Broccoli',
    },
    {
      type: 'Vegetable',
      name: 'Mushroom',
    },
    {
      type: 'Fruit',
      name: 'Banana',
    },
    {
      type: 'Vegetable',
      name: 'Tomato',
    },
    {
      type: 'Fruit',
      name: 'Orange',
    },
    {
      type: 'Fruit',
      name: 'Mango',
    },
    {
      type: 'Fruit',
      name: 'Pineapple',
    },
    {
      type: 'Vegetable',
      name: 'Cucumber',
    },
    {
      type: 'Fruit',
      name: 'Watermelon',
    },
    {
      type: 'Vegetable',
      name: 'Carrot',
    },
  ]

  useEffect(() => {
    setMockDataFilter([...mockdata])

    fetch('http://localhost:3000/api/group')
      .then((res) => res.json())
      .then((data) => {
        setMounted(true)
        console.log("Log API group department => ", data)
        console.log("Log API group department JSON STR => ", JSON.stringify(data))
      })

  }, [])
  if (!mounted) {
    return <div>Loading...</div>
  }

  function activeTodo(item: { type: string, name: string }) {
    if (item.type == "Fruit") {
      setFruit([...fruit, item])
      setMockDataFilter(prevState => [...prevState.filter(state => state.name != item.name)])
    } else if (item.type == "Vegetable") {
      setVegetable([...vegetable, item])
      setMockDataFilter(prevState => [...prevState.filter(state => state.name != item.name)])
    }
  }

  function tickerDelete(item: { type: string, name: string }) {
    if (item.type == "Fruit") {
      setFruit(prevState => [...prevState.filter(state => state.name != item.name)])
      setMockDataFilter(prevState => [...prevState, item])
    } else if (item.type == "Vegetable") {
      setVegetable(prevState => [...prevState.filter(state => state.name != item.name)])
      setMockDataFilter(prevState => [...prevState, item])
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ padding: '20px' }}>Todo List</div>

      <div className="flex justify-center">
        <div style={{ padding: '20px', minWidth: '200px' }}>
          {
            mockDataFilter.map(item =>
              <TodoComponentView key={`mock-${item.name}`} title={item.name} callback={() => activeTodo(item)} />
            )
          }
        </div>

        <div style={{ padding: '20px', minWidth: '200px' }}>
          <div>Fruit</div>

          {
            fruit.map(item =>
              <TodoComponentView key={`fruit-${item.name}`} title={item.name} ticker={() => tickerDelete(item)} callback={() => tickerDelete(item)} />
            )
          }
        </div>

        <div style={{ padding: '20px', minWidth: '200px' }}>
          <div>Vegetable</div>

          {
            vegetable.map(item =>
              <TodoComponentView key={`vegetable-${item.name}`} title={item.name} ticker={() => tickerDelete(item)} callback={() => tickerDelete(item)} />
            )
          }
        </div>
      </div>
    </div>
  );
}
