import { RequestHandler } from "express";
import { items } from "../data/items";
import { Item } from "../models/item";

export const getItems: RequestHandler = (req, res) => {
  res.json(items);
};

export const getItemById: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(item);
};

export const createItem: RequestHandler = (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Name is required and must be a string" });
    return;
  }

  const newItem: Item = {
    id: Date.now(),
    name
  };

  items.push(newItem);
  res.status(201).json(newItem);
};

export const updateItem: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const item = items.find(i => i.id === id);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Name is required and must be a string" });
    return;
  }

  item.name = name;
  res.json(item);
};

export const deleteItem: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  items.splice(index, 1);
  res.status(204).send();
};
