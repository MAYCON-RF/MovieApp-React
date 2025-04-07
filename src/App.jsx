
//importes iniciais
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';



//conforme a documentação do site https://developer.themoviedb.org/docs/append-to-response
const url = 'https://api.themoviedb.org/3';
const key = 'cb8aa97aefa3540c0fa8f582cce31e14'; 

