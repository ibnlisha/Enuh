import Charts from '../pages/home/charts/Charts'
import Home from '../pages/home/Home'
import WidgetSm from './widgets/WidgetSm'
import WidgetLg from './widgets/WidgetLg'

const Content = () => {
  const data = [
    {
      name: 'January',
      'Active User': 4000,
    },
    {
      name: 'February',
      'Active User': 3000,
    },
    {
      name: 'March',
      'Active User': 2000,
    },
    {
      name: 'April',
      'Active User': 2780,
    },
    {
      name: 'May',
      'Active User': 1890,
    },
    {
      name: 'June',
      'Active User': 2390,
    },
    {
      name: 'July',
      'Active User': 3490,
    },
    {
      name: 'August',
      'Active User': 3490,
    },
    {
      name: 'September',
      'Active User': 3490,
    },
    {
      name: 'October',
      'Active User': 3490,
    },
    {
      name: 'November',
      'Active User': 3490,
    },
    {
      name: 'Deccember',
      'Active User': 3490,
    },
  ];
  return (
    <section className="content">
        <Home />
        <Charts data = {data} dataKey = 'Active User' grid title = 'Subscribers'/>
        <div className="homeWidgets" style = {{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '1em',
          width: '100%',
          // color: 'red'
        }}>
          <WidgetSm />
          <WidgetLg />
        </div>
    </section>
  )
}

export default Content