import './charts.css'
import { ResponsiveContainer, LineChart, CartesianGrid,
XAxis, Tooltip, Legend, Line } from 'recharts'
const Charts = ({title, data, dataKey, grid}) => {
    
  return (
    <div className='chartContainer'>
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width = "100%" aspect = {4 / 1}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {grid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey = 'name'
          stroke = '#5550bd'
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Charts