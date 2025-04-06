import json
import pytest


COMPANIES = ["4tw", "adsy", "coders-only", "dectris", "hot", "others", "unibe"]


def read_json_file(path):
    with open(path) as fp:
        return json.load(fp)


@pytest.fixture
def stack():
    return read_json_file("assets/data/stack.json")


@pytest.fixture
def stack_keys(stack):
    return set(map(lambda x: x["key"], stack))


@pytest.fixture(params=COMPANIES)
def assignments(request):
    return read_json_file(f"assets/data/assignments/{request.param}.json")


def test_the_stack_is_complete(stack_keys, assignments):
    used_stack = set(tool for assignment in assignments for tool in assignment["stack"])
    assert used_stack.issubset(stack_keys), used_stack - stack_keys.intersection(
        used_stack
    )


@pytest.fixture
def combined_assignments():
    return {
        company: read_json_file(f"assets/data/assignments/{company}.json")
        for company in COMPANIES
    }


def test_stack_is_fully_assigned(stack_keys, combined_assignments):
    used_stack = set(
        tool
        for company in combined_assignments.values()
        for assignment in company
        for tool in assignment["stack"]
    )
    assert used_stack == stack_keys
