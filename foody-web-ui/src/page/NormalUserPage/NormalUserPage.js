import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardItem from "../../component/CardItem/CardItem";
import moment from "moment";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./NormalUserPage.css";
import mainContext from "../../context/mainContext";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";

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
  {
    id: 6,
    title: "Thit bo",
    updatedDate: moment().format("dddd DD MM yyyy"),
    price: "10000",
    unit: "Kg",
    total: 100,
  },
  {
    id: 7,
    title: "Thit lon",
    updatedDate: moment().format("dddd DD MM yyyy"),
    price: "10000",
    unit: "Kg",
    total: 100,
  },
];
const Content = () => {
  const [value, setValue] = React.useState(0);
  const { searchTerm } = React.useContext(mainContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Header />
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
          {data.filter((item) =>
            item.title
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          ).length === 0 && (
            <div style={{ display: "inline-grid" }}>
              <ScreenSearchDesktopOutlinedIcon
                style={{ width: 100, height: 100 }}
              />
              <span> No data found</span>
            </div>
          )}
          {data
            .filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            )
            .map((item) => {
              return (
                <CardItem
                  key={item.id}
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
      <Footer />
    </>
  );
};
export default Content;
