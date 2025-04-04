from functools import reduce
import json
import pytest


COMPANIES = ["4tw", "adsy", "dectris", "hot"]


def read_json_file(path):
    with open(path) as fp:
        return json.load(fp)


@pytest.fixture
def stack():
    return read_json_file("assets/data/stack.json")


@pytest.fixture(params=COMPANIES)
def assignments(request):
    return read_json_file(f"assets/data/assignments/{request.param}.json")


def test_the_stack_is_complete(stack, assignments):
    stack_keys = set(map(lambda x: x["key"], stack))
    used_stack = set(reduce(lambda x, y: x + y["stack"], assignments, []))
    assert used_stack.issubset(stack_keys), used_stack - stack_keys.intersection(used_stack)