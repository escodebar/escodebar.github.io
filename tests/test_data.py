from functools import reduce
import json
import pytest


@pytest.fixture
def stack():
    with open("assets/data/stack.json") as fp:
        return json.load(fp)


@pytest.fixture(params=["4tw", "adsy", "dectris", "hot"])
def company(request):
    with open(f"assets/data/assignments/{request.param}.json") as fp:
        return json.load(fp)


@pytest.mark.xfail
def test_the_stack_is_complete(stack, company):
    stack_keys = set(map(lambda x: x["key"], stack))
    used_stack = set(reduce(lambda x, y: x + y["stack"], company, []))
    assert used_stack.issubset(stack_keys), used_stack - stack_keys.intersection(used_stack)
