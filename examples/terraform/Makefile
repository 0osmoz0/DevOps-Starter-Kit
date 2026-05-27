.PHONY: init fmt validate plan apply destroy clean

init:
	terraform init

fmt:
	terraform fmt -recursive

validate: init
	terraform validate

plan: init
	terraform plan

apply: init
	terraform apply

destroy: init
	terraform destroy

clean:
	rm -rf .terraform generated *.tfstate *.tfstate.*
