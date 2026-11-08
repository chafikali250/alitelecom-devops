# AliTelecom DevOps Infrastructure & Application Suite

AliTelecom is an enterprise-grade, cloud-native telecom service portal deployed using modern DevOps methodologies. This repository contains the full Infrastructure as Code (IaC), containerized microservices codebase, Kubernetes manifests, CI/CD pipeline definitions, and monitoring configurations.

---

## 🏗 System Architecture

```text
                     +---------------------------------------+
                     |          AWS Route 53 / EKS           |
                     +---------------------------------------+
                                         |
                                         v
                     +---------------------------------------+
                     |         NGINX Ingress Controller      |
                     +---------------------------------------+
                                   /           \
                                  v             v
                    +------------------+   +------------------+
                    | Frontend Service |   | Backend Service  |
                    |   (NGINX/HTML5)  |   | (Node.js API)    |
                    +------------------+   +------------------+
                                  \             /
                                   v           v
                     +---------------------------------------+
                     |         Monitoring & Metrics          |
                     |         Prometheus + Grafana          |
                     +---------------------------------------+
