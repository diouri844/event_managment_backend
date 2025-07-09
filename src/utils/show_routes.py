# utils/show_routes.py

def show_routes(app):
    with app.app_context():
        for rule in app.url_map.iter_rules():
            methods = ','.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
            print(f"{rule.endpoint:30s} {methods:10s} {rule.rule}")
            