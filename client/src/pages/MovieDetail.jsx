import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

export default function MovieDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  return (
    <div>MovieDetail with {id}</div>
  )
}
