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

def count_parameters(m, x, y):
    """Calculate and return the total number of learnable parameters in a given PyTorch model."""
    m.total_params[0] = calculate_parameters(m.parameters())


def zero_ops(m, x, y):
    """Incrementally add zero operations to the model's total operations count."""
    m.total_ops += calculate_zero_ops()








    def count_convNd(m: _ConvNd, x, y: torch.Tensor):
    x = x[0]

    m.total_ops += calculate_conv2d_flops(
        input_size=list(x.shape),
        output_size=list(y.shape),
        kernel_size=list(m.weight.shape),
        groups=m.groups,
        bias=m.bias,
        transpose=False,
    )


def count_convtNd(m: _ConvNd, x, y: torch.Tensor):
    x = x[0]

    m.total_ops += calculate_conv2d_flops(
        input_size=list(x.shape),
        output_size=list(y.shape),
        kernel_size=list(m.weight.shape),
        groups=m.groups,
        bias=m.bias,
        transpose=True,
    )


def count_convNd_ver2(m: _ConvNd, x, y: torch.Tensor):
    x = x[0]
    output_size = torch.zeros(y.size()[:1] + y.size()[2:]).numel()

    m.total_ops += calculate_conv(
        m.bias.nelement(),
        m.weight.nelement(),
        output_size
    )