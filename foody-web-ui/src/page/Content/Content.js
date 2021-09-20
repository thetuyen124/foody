import * as React from "react";
import "./Content.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardItem from "../../component/CardItem/CardItem";
import moment from "moment";

function TabPanel(props) {
  const { children, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel`}
      aria-labelledby={`simple-tab-`}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
};

const handleOnClick = (evt) => {
  console.log(evt.target.value);
};
function a11yProps(index) {
  return {
    value: index,
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    onClick: handleOnClick,
  };
}
const data = [
  {
    id: 1,
    title: "chicken",
    updatedDate: moment().format("dddd DD MM yyyy"),
    price: "10000",
    unit: "Kg",
    total: 100,
  },
  {
    id: 2,
    title: "Dau phu",
    updatedDate: moment().format("dddd DD MM yyyy"),
    price: "2000",
    unit: "Chiec",
    total: 1000,
  },
  {
    id: 3,
    title: "Rau cai",
    updatedDate: moment().format("dddd DD MM yyyy"),
    price: "10000",
    unit: "Kg",
    total: 100,
  },
  {
    id: 4,
    title: "Rau muong",
    updatedDate: moment().format("dddd DD MM yyyy"),
    price: "10000",
    unit: "Kg",
    total: 190,
  },
  {
    id: 5,
    title: "Rau bap cai",
    updatedDate: moment().format("dddd DD MM yyyy"),
    price: "10000",
    unit: "Kg",
    total: 100,
  },
];
const Content = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Thịt cá" {...a11yProps(1)} />
          <Tab label="Rau củ" {...a11yProps(2)} />
          <Tab label="Món ăn" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel className="content-filed" value={value}>
        {data.map((item) => {
          return (
            <CardItem
              title={item.title}
              updatedDate={item.updatedDate}
              price={item.price}
              unit={item.unit}
              total={item.total}
            />
          );
        })}
      </TabPanel>
    </div>
  );
};
export default Content;
