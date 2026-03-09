import logging

import torch
import torch.nn as nn
from torch.nn.modules.conv import _ConvNd

from thop.vision.calc_func import (
    calculate_adaptive_avg,
    calculate_avgpool,
    calculate_conv,
    calculate_conv2d_flops,
    calculate_linear,
    calculate_norm,
    calculate_parameters,
    calculate_relu,
    calculate_relu_flops,
    calculate_softmax,
    calculate_upsample,
    calculate_zero_ops,
)

multiply_adds = 1