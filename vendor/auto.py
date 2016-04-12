#!/usr/bin/python3
# -*- coding: utf-8 -*-

import sys
import os.path

#--- prepare env
self_dir = os.path.dirname(os.path.abspath(__file__))
if not self_dir in sys.path:
	sys.path.insert( 0, self_dir )
