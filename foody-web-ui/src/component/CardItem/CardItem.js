import "./CardItem.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CardContent, Slider, Typography } from "@mui/material";
import { useState } from "react";

export default function CardItem(props) {
  const { title, updatedDate, img, price, unit, total, id } = props;
  const [quantity, setQuantity] = useState(1);
  const handleChange = (evt) => {
    if (
      /^[0-9]+$/.test(evt.target.value) &&
      parseInt(evt.target.value) <= total &&
      parseInt(evt.target.value) > 0
    ) {
      setQuantity(evt.target.value);
    } else if (
      /^[0-9.]+$/.test(evt.target.value) &&
      parseFloat(evt.target.value) <= parseFloat(total) &&
      unit === "Kg" &&
      parseFloat(evt.target.value) > 0 &&
      evt.target.value.split(".").length === 2
    ) {
      setQuantity(evt.target.value);
    } else if (parseFloat(evt.target.value) > total) {
      setQuantity(total);
    }
  };

  return (
    <Card className="card" sx={{ width: 270, height: 340 }} key={id}>
      <CardHeader title={title} subheader={`Latest update on ${updatedDate}`} />
      <CardMedia component="img" height="150" image={img} alt="disk image" />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Price: {price} VND/
          {unit}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {total}
          {unit}
        </Typography>
      </CardContent>
      <CardActions>
        <Slider
          style={{ marginLeft: 7 }}
          size="small"
          value={quantity}
          aria-label="Small"
          max={total}
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
        <input
          onChange={handleChange}
          style={{ width: 40, marginLeft: 5 }}
          value={quantity}
        />
        <IconButton aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
